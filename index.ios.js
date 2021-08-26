import { Application } from '@nativescript/core';
import { Video as VideoBase, VideoFill, videoSourceProperty, fillProperty, subtitleSourceProperty } from './common';
export * from './common';
export class Video extends VideoBase {
    constructor() {
        super();
        this.enableSubtitles = false;
        this._playerController = AVPlayerViewController.new();
        if (!Video.iosIgnoreAudioSessionChange) {
            let audioSession = AVAudioSession.sharedInstance();
            let output = audioSession.currentRoute.outputs.lastObject.portType;
            if (output.match(/Receiver/)) {
                try {
                    audioSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
                    audioSession.overrideOutputAudioPortError(1936747378 /* Speaker */);
                    audioSession.setActiveError(true);
                    //console.log("audioSession category set and active");
                }
                catch (err) {
                    //console.log("setting audioSession category failed");
                }
            }
        }


        let url = NSURL.URLWithString(this._src);
        // console.log("---------------------");
        // console.log("_src " + this._src)



        var headers = new NSMutableDictionary();
        headers.setObjectForKey(this.token ?? "", "Authorization");
        var options = NSDictionary.dictionaryWithDictionary({
            "AVURLAssetHTTPHeaderFieldsKey": headers
        });
        var asset = AVURLAsset.URLAssetWithURLOptions(url, options);
        var item = AVPlayerItem.playerItemWithAsset(asset);
        this._player = AVPlayer.playerWithPlayerItem(item);



       // this._player = AVPlayer.new();
        this._playerController.player = this._player;
        // showsPlaybackControls must be set to false on init to avoid any potential 'Unable to simultaneously satisfy constraints' errors
        this._playerController.showsPlaybackControls = false;
        this.nativeView = this._playerController.view;
        this._observer = PlayerObserverClass.new();
        this._observer['_owner'] = this;
        this._videoFinished = false;
        // subtitles setup
        if (this.enableSubtitles) {
            this._subtitling = new ASBPlayerSubtitling();
            this._setupSubtitleLabel();
        }
    }

    [videoSourceProperty.setNative](value) {
        this._setNativeVideo(value ? value.ios : null);
    }
    [fillProperty.setNative](value) {
        let videoGravity = AVLayerVideoGravityResize; // default
        switch (value) {
            case VideoFill.aspect:
                videoGravity = AVLayerVideoGravityResizeAspect;
                break;
            case VideoFill.aspectFill:
                videoGravity = AVLayerVideoGravityResizeAspectFill;
                break;
        }
        if (this._playerController) {
            this._playerController.videoGravity = videoGravity;
        }
    }
    [subtitleSourceProperty.setNative](value) {
        this._updateSubtitles(value ? value.ios : null);
    }

    _setNativeVideo(nativeVideoPlayer) {
        //console.log("Set native video: "+nativeVideoPlayer);
        if (this._player == null) {
            setTimeout(() => {
                this._setNativeVideo(nativeVideoPlayer);
            }, 100);
            return;
        }
            var url = NSURL.URLWithString(this._url);
            var headers = new NSMutableDictionary();
            headers.setValueForKey(this.token, "Authorization");
            var options = NSDictionary.dictionaryWithDictionary({
                AVURLAssetHTTPHeaderFieldsKey: headers
            });
            var asset = AVURLAsset.URLAssetWithURLOptions(url, options);
            var item = AVPlayerItem.playerItemWithAsset(asset);
        //     nativeVideoPlayer = item;
        //     console.log("nativeVideoPlayer " + nativeVideoPlayer);
        // }
        if (nativeVideoPlayer != null) {
            let currentItem = this._player.currentItem;
            this._addStatusObserver(nativeVideoPlayer);
            this._autoplayCheck();
            this._backgroundAudioCheck();
            this._videoFinished = false;
            if (currentItem !== null) {
                this._videoLoaded = false;
                this._videoPlaying = false;
                this._removeStatusObserver(currentItem);
                // Need to set to null so the previous video is not shown while its loading
                this._player.replaceCurrentItemWithPlayerItem(null);
                //this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
                this._player.replaceCurrentItemWithPlayerItem(item);
            
            }
            else {
             //   this._player.replaceCurrentItemWithPlayerItem(nativeVideoPlayer);
                this._player.replaceCurrentItemWithPlayerItem(item);
                this._init();
            }
        }
    }
    updateAsset(nativeVideoAsset) {
        let newPlayerItem = AVPlayerItem.playerItemWithAsset(nativeVideoAsset);
        this._setNativeVideo(newPlayerItem);
    }
    _setNativePlayerSource(nativePlayerSrc) {
        // let headers = [
        //     "custome_header": "custome value"
        //  ]
        //  let asset = AVURLAsset(url: URL, options: ["AVURLAssetHTTPHeaderFieldsKey": headers])
        //  let playerItem = AVPlayerItem(asset: asset)

        this._src = nativePlayerSrc;
        let url = NSURL.URLWithString(this._src);
        console.log("---------------------");
        console.log("_src " + this._src)



        var headers = new NSMutableDictionary();
        headers.setValueForKey(this.token, "Authorization");
        var options = NSDictionary.dictionaryWithDictionary({
            AVURLAssetHTTPHeaderFieldsKey: headers
        });
        var asset = AVURLAsset.URLAssetWithURLOptions(url, options);
        var item = AVPlayerItem.playerItemWithAsset(asset);
        this._player = AVPlayer.playerWithPlayerItem(item);



        //this._player = new AVPlayer(url);
        this._playerController.player = null;
        this._playerController.player = this._player;
        //console.log("Video src: "+ this._src);
        this._init();
    }
    _init() {
        if (this.controls !== false) {
            this._playerController.showsPlaybackControls = true;
        }
        this._playerController.player = this._player;
        if (isNaN(this.width) || isNaN(this.height)) {
            this.requestLayout();
        }
        if (this.muted === true) {
            this._player.muted = true;
        }
        if (!this._didPlayToEndTimeActive) {
            this._didPlayToEndTimeObserver = Application.ios.addNotificationObserver(AVPlayerItemDidPlayToEndTimeNotification, this.AVPlayerItemDidPlayToEndTimeNotification.bind(this));
            this._didPlayToEndTimeActive = true;
        }
        if (this.enableSubtitles) {
            // it's important to set subtitle label first and then player - to let label pick up styles
            this._subtitling.label = this._subtitleLabel;
            this._subtitling.containerView = this._subtitleLabelContainer;
            this._subtitling.player = this._player;
        }
    }
    _setupSubtitleLabel() {
        let contentOverlayView = this._playerController.contentOverlayView;
        this._subtitleLabel = UILabel.new();
        this._subtitleLabelContainer = UIView.new();
        contentOverlayView.addSubview(this._subtitleLabelContainer);
        this._subtitleLabelContainer.addSubview(this._subtitleLabel);
        //configure subtitle container - this is required to make insets
        this._subtitleLabelContainer.backgroundColor = UIColor.blackColor;
        this._subtitleLabelContainer.layer.cornerRadius = 2;
        this._subtitleLabelContainer.layer.masksToBounds = true;
        // attach subtitle label to all corners of container
        this._subtitleLabel.translatesAutoresizingMaskIntoConstraints = false;
        this._subtitleLabelContainer.translatesAutoresizingMaskIntoConstraints = false;
        let containerViewsDictionary = NSDictionary.dictionaryWithObjectsForKeys([this._subtitleLabel], ['subtitleLabel']);
        this._subtitleLabelContainer.addConstraints(NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews('H:|-(5)-[subtitleLabel]-(5)-|', 0 /* DirectionLeadingToTrailing */, null, containerViewsDictionary));
        this._subtitleLabelContainer.addConstraints(NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews('V:|-(0)-[subtitleLabel]-(0)-|', 0 /* DirectionLeadingToTrailing */, null, containerViewsDictionary));
        this._subtitleLabel.textColor = UIColor.whiteColor;
        this._subtitleLabel.textAlignment = 1 /* Center */;
        this._subtitleLabel.lineBreakMode = 0 /* ByWordWrapping */;
        this._subtitleLabel.font = UIFont.systemFontOfSizeWeight(15, UIFontWeightRegular);
        this._subtitleLabel.numberOfLines = 0;
        this._subtitleLabel.translatesAutoresizingMaskIntoConstraints = false;
        let viewsDictionary = NSDictionary.dictionaryWithObjectsForKeys([this._subtitleLabelContainer, contentOverlayView], ['subtitleLabelContainer', 'superview']);
        // make 20 point insets from sides
        contentOverlayView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews('H:|-(>=20)-[subtitleLabelContainer]-(>=20)-|', 0, null, viewsDictionary));
        // center text
        contentOverlayView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews('V:[superview]-(<=1)-[subtitleLabelContainer]', 512 /* AlignAllCenterX */, null, viewsDictionary));
        // add 30 point margin from bottom
        contentOverlayView.addConstraints(NSLayoutConstraint.constraintsWithVisualFormatOptionsMetricsViews('V:[subtitleLabelContainer]-(20)-|', 0, null, viewsDictionary));
    }
    _updateSubtitles(subtitles) {
        if (this.enableSubtitles) {
            try {
                this._subtitling.loadSRTContentError(subtitles);
            }
            catch (e) {
                console.log('Failed to load subtitles: ' + e); // NSError:
            }
        }
    }
    AVPlayerItemDidPlayToEndTimeNotification(notification) {
        if (this._player && this._player.currentItem && this._player.currentItem === notification.object) {
            // This will match exactly to the object from the notification so can ensure only looping and finished event for the video that has finished.
            // Notification is structured like so: NSConcreteNotification 0x61000024f690 {name = AVPlayerItemDidPlayToEndTimeNotification; object = <AVPlayerItem: 0x600000204190, asset = <AVURLAsset: 0x60000022b7a0, URL = https://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4>>}
            this._emit(VideoBase.finishedEvent);
            this._videoFinished = true;
            if (this.loop === true && this._player !== null) {
                // Go in 5ms for more seamless looping
                this._player.seekToTime(CMTimeMake(5, 100));
                this._player.play();
            }
        }
    }
    play() {
        if (this._videoFinished) {
            this._videoFinished = false;
            this.seekToTime(0);
        }
        if (this.observeCurrentTime && !this._playbackTimeObserverActive) {
            this._addPlaybackTimeObserver();
        }
        console.log("this.playerController " + this._playerController)
        this._player.play();
    }
    pause() {
        if (this._player) {
            this._player.pause();
        }
        if (this._playbackTimeObserverActive) {
            this._removePlaybackTimeObserver();
        }
    }
    mute(mute) {
        if (this._player) {
            this._player.muted = mute;
        }
    }
    seekToTime(seconds) {
        if (this._player) {
            if (this._player.currentItem && this._player.currentItem.status === 1) {
                let time = CMTimeMakeWithSeconds(seconds, this._player.currentTime().timescale);
                try {
                    this._player.seekToTimeToleranceBeforeToleranceAfterCompletionHandler(time, kCMTimeZero, kCMTimeZero, (isFinished) => {
                        this._emit(VideoBase.seekToTimeCompleteEvent);
                    });
                }
                catch (e) {
                    console.error(e);
                }
            }
            else {
                console.log('AVPlayerItem cannot service a seek request with a completion handler until its status is ReadyToPlay.');
            }
        }
    }
    getDuration() {
        if (!this._player || (this._player && this._player.currentItem == null)) {
            return 0;
        }
        let seconds = CMTimeGetSeconds(this._player.currentItem.asset.duration);
        let milliseconds = seconds * 1000.0;
        return milliseconds;
    }
    getCurrentTime() {
        if (!this._player) {
            return 0;
        }
        return (this._player.currentTime().value / this._player.currentTime().timescale) * 1000;
    }
    setVolume(volume) {
        if (this._player) {
            this._player.volume = volume;
        }
    }
    setPlaybackSpeed(speed) {
        this._player.rate = speed;
    }
    destroy() {
        if (this._player) {
            this._removeStatusObserver(this._player.currentItem);
        }
        if (this._didPlayToEndTimeActive) {
            Application.ios.removeNotificationObserver(this._didPlayToEndTimeObserver, AVPlayerItemDidPlayToEndTimeNotification);
            this._didPlayToEndTimeActive = false;
        }
        if (this._playbackTimeObserverActive) {
            this._removePlaybackTimeObserver();
        }
        this.pause();
        if (this._player) {
            // de-allocates the AVPlayer
            this._player.replaceCurrentItemWithPlayerItem(null);
        }
        this._playerController = null;
        this._player = null;
    }
    _addStatusObserver(currentItem) {
        this._observerActive = true;
        currentItem.addObserverForKeyPathOptionsContext(this._observer, 'status', 0, null);
    }
    _removeStatusObserver(currentItem) {
        // If the observer is active, then we need to remove it...
        if (!this._observerActive) {
            return;
        }
        this._observerActive = false;
        if (currentItem) {
            currentItem.removeObserverForKeyPath(this._observer, 'status');
        }
    }
    _addPlaybackTimeObserver() {
        this._playbackTimeObserverActive = true;
        let _interval = CMTimeMake(1, 5);
        if (this._player) {
            // only if valid player instance
            this._playbackTimeObserver = this._player.addPeriodicTimeObserverForIntervalQueueUsingBlock(_interval, null, (currentTime) => {
                let _seconds = CMTimeGetSeconds(currentTime);
                let _milliseconds = _seconds * 1000.0;
                this.notify({
                    eventName: Video.currentTimeUpdatedEvent,
                    object: this,
                    position: _milliseconds,
                });
            });
        }
    }
    _removePlaybackTimeObserver() {
        this._playbackTimeObserverActive = false;
        if (this._player) {
            this._player.removeTimeObserver(this._playbackTimeObserver);
        }
    }
    _autoplayCheck() {
        if (this.autoplay) {
            this.play();
        }
    }
    _backgroundAudioCheck() {
        try {
            const audioSession = AVAudioSession.sharedInstance();
            if (this.backgroundAudio) {
                audioSession.setCategoryError(AVAudioSessionCategoryAmbient);
            }
            else {
                audioSession.setCategoryError(AVAudioSessionCategoryPlayAndRecord);
            }
            audioSession.setActiveError(true);
        }
        catch (err) {
            // If for some reason we can't change where the audio is playing, we don't care...  :-)
        }
    }
    playbackReady() {
        this._videoLoaded = true;
        this._emit(VideoBase.playbackReadyEvent);
        if (this.detectChapters) {
            const playerItem = this._player.currentItem;
            const chapterLocalesKey = 'availableChapterLocales';
            playerItem.asset.loadValuesAsynchronouslyForKeysCompletionHandler(NSArray.arrayWithArray([chapterLocalesKey]), () => {
                let status = playerItem.asset.statusOfValueForKeyError(chapterLocalesKey);
                if (status === 2 /* Loaded */) {
                    let languages = NSLocale.preferredLanguages;
                    let chapterMetadata = playerItem.asset.chapterMetadataGroupsBestMatchingPreferredLanguages(languages);
                    // Emit chapter metadata for developers to work with
                    // TODO: could pre-parse them however likely be most versatile allowing dev's to parse however they'd like so no data is missed
                    this.notify({
                        eventName: VideoBase.chaptersLoadedEvent,
                        object: this,
                        data: chapterMetadata,
                    });
                }
                else {
                    // Handle other status cases
                }
            });
        }
    }
    playbackStart() {
        this._videoPlaying = true;
        this._emit(VideoBase.playbackStartEvent);
    }
}
var PlayerObserverClass = /** @class */ (function (_super) {
    __extends(PlayerObserverClass, _super);
    function PlayerObserverClass() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PlayerObserverClass.prototype.observeValueForKeyPathOfObjectChangeContext = function (path, obj, change, context) {
        if (path === 'status') {
            if (this['_owner']._player.currentItem.status === AVPlayerItemStatus.ReadyToPlay && !this['_owner']._videoLoaded) {
                this['_owner'].playbackReady();
            }
        }
    };
    return PlayerObserverClass;
}(NSObject));
//# sourceMappingURL=index.ios.js.map