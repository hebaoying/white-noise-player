// gua.js
var log = console.log.bind(console)

var e = function(selector) {
    return document.querySelector(selector)
}
// es 返回一个数组，包含所有被选中的元素
var es = function(selector) {
    var elements = document.querySelectorAll(selector)
    return elements
}

var appendHtml = function(element, html) {
	element.insertAdjacentHTML('beforeend', html)
}

var bindEvent = function(element, eventName, callback) {
    element.addEventListener(eventName, callback)
}

var bindAll = function(selector, eventName, callback) {
    var elements = document.querySelectorAll(selector)
    for(var i = 0; i < elements.length; i++) {
        var e = elements[i]
        bindEvent(e, eventName, callback)
    }
}

var removeClassAll = function(className) {
    var selector = '.' + className
    var elements = document.querySelectorAll(selector)
    for (var i = 0; i < elements.length; i++) {
        var e = elements[i]
        e.classList.remove(className)
    }
}
//
var Noises = [
    {
        name: 'cafe',
        mcuu: '咖啡厅',
        selected: false,
    },
    {
        name: 'chimes',
        mcuu: '风铃',
        selected: false,
    },
    {
        name: 'cow',
        mcuu: '农场',
        selected: false,
    },
    {
        name: 'day',
        mcuu: '晴天',
        selected: false,
    },
    {
        name: 'fire',
        mcuu: '篝火边',
        selected: false,
    },
    {
        name: 'night',
        mcuu: '仲夏夜',
        selected: false,
    },
    {
        name: 'rails',
        mcuu: '火车里',
        selected: false,
    },
    {
        name: 'rain',
        mcuu: '三月的雨',
        selected: false,
    },
    {
        name: 'river',
        mcuu: '溪水',
        selected: false,
    },
    {
        name: 'space',
        mcuu: '太空',
        selected: false,
    },
    {
        name: 'thunderstorm',
        mcuu: '雷鸣电闪',
        selected: false,
    },
    {
        name: 'water',
        mcuu: '海水',
        selected: false,
    },
    {
        name: 'whale',
        mcuu: '鲸歌',
        selected: false,
    },
    {
        name: 'wind',
        mcuu: '微风',
        selected: false,
    },
    {
        name: 'yacht',
        mcuu: '帆船',
        selected: false,
    },

]
// html 样式
var template = function(noise) {
    var name = noise.name
    var mcuu = noise.mcuu
    var t = `
        <div class="cell">
            <audio src="mp3/${name}.mp3" class='audio-player' loop></audio>

            <div class="left icon vertical-center">
                <img class="vertical-center" src="image/${name}-icon@2x.png">
            </div>

            <div class=" title">
                <span>${mcuu}</span>

                <div class="volumeDiv">
                    <input type="range" min="0" max="1" step="0.03" id="volume" value="0.5">
                </div>

            </div>
        </div>
    `
    return t
}

// 插入 html
var templateNoises = function() {
    var result = ''
    for (var i = 0; i < Noises.length; i++) {
        var noise = Noises[i]
        result += template(noise)
    }
    appendHtml(e('.main'), result)
}

// 选择声音
var toggleNoise = function() {
    bindAll('.icon', 'click', function(event) {
        var self = event.target
        // 添加 class, 改变样式
        var cell = self.parentElement.parentElement
        cell.classList.toggle('canplay')

        // 中间插入播放
        var play = e('#play')
        // 如果正在播放中
        var playing = play.classList.contains('hidden')
        // log('playing', playing)
        if (playing) {
            var canJump = cell.classList.contains('canplay')
            if (canJump) {
                playSingle(cell)
            } else {
                stopSingle(cell)
            }
        }

    })
}
var playSingle = function(cell) {
    var noise = cell.querySelector('.audio-player')
    noise.play()
}

var stopSingle = function(cell) {
    var noise = cell.querySelector('.audio-player')
    noise.pause()
}
//播放
var bindAction = function() {
	var play = e('#play')
	bindEvent(play, 'click', function(){
        // 隐藏播放键, 显示暂停键
        var stop = e('#stop')
        stop.classList.remove('hidden')
        play.classList.add('hidden')

        // 循环选中的音频, 播放
		var selectedCells = es('.canplay')
        for (var i = 0; i < selectedCells.length; i++) {
            var cell = selectedCells[i]
            log('cell', cell)
            playSingle(cell)
            // 循环播放好像可以在 audio 里面加上 loop 就可以了
            // singleAlways(a)
        }
	})
}


// 单个暂停
//暂停
var bindStop = function() {
    var stop = e('#stop')
	bindEvent(stop, 'click', function(){
        // // 隐藏暂停键, 显示
        var play = e('#play')
        play.classList.remove('hidden')
        stop.classList.add('hidden')

        // 循环选中的音频, 暂停
		var selectedCells = es('.canplay')
        for (var i = 0; i < selectedCells.length; i++) {
            var cell = selectedCells[i]
            stopSingle(cell)
        }
	})
}


// 给 input range 添加改变音量事件
var bindVolume = function() {
    bindAll('#volume', 'input', function(event) {
        var self = event.target
        log(self)
        var cell = self.closest('.cell')
        var audio = cell.querySelector('.audio-player')
        var value = self.value
        audio.volume = value
    })
}


var __main = function(){
    // 业务函数
    templateNoises()
    // 播放和暂停
    bindAction()
    bindStop()

    // 选择声音
    toggleNoise()

    // 调节音量
    bindVolume()
}
__main()
