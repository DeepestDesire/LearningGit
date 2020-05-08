import { uploadScore } from 'network/index'
import p_bg from '@images/p_bg.png'
import item_car from '@images/item_car.png'
import item_fireBall from '@images/item_fireBall.png'
import item_gift1 from '@images/item_gift1.png'
import item_gift2 from '@images/item_gift2.png'
import item_dimond from '@images/item_dimond.png'

export default function GameScene(props) {
  // 实际应用场景改为window.innerWidth和window.innerHeight。
  // 这里是为了方便查看示例。
  var width = window.innerWidth
  var height = window.innerHeight

  // 创建游戏实例
  var game = new Phaser.Game(width, height, Phaser.AUTO, '#game')

  // 定义场景
  var states = {
    // 加载场景
    preload: function() {
      this.preload = function() {
        // 设置背景为黑色
        game.stage.backgroundColor = 'rgba(21, 169, 255,0.1)'
        // 加载游戏资源
        game.load.crossOrigin = 'anonymous' // 设置跨域
        game.load.image('bg', p_bg)
        game.load.image('dude', item_car)
        game.load.image('green', item_gift1)
        game.load.image('red', item_gift2)
        game.load.image('yellow', item_dimond)
        game.load.image('bomb', item_fireBall)
        game.load.image(
          'five',
          '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/five.png'
        )
        game.load.image(
          'three',
          '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/three.png'
        )
        game.load.image(
          'one',
          '//24haowan-cdn.shanyougame.com/pickApple2/assets/images/one.png'
        )
        game.load.audio(
          'scoreMusic',
          '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/addscore.mp3'
        )
        game.load.audio(
          'bombMusic',
          '//24haowan-cdn.shanyougame.com/pickApple2/assets/audio/boom.mp3'
        )
        // 添加进度文字
        var progressText = game.add.text(
          game.world.centerX,
          game.world.centerY,
          '0%',
          {
            fontSize: '60px',
            fill: '#ffffff',
          }
        )
        progressText.anchor.setTo(0.5, 0.5)
        // 监听加载完一个文件的事件
        game.load.onFileComplete.add(function(progress) {
          progressText.text = progress + '%'
        })
        // 监听加载完毕事件
        game.load.onLoadComplete.add(onLoad)
        // 加载完毕回调方法
        function onLoad() {
          game.state.start('created')
        }
      }
    },
    // 开始场景
    created: function() {
      this.create = function() {
        // 添加背景
        var bg = game.add.image(0, 0, 'bg')
        bg.width = game.world.width
        bg.height = game.world.height
        // 添加标题
        var title = game.add.text(
          game.world.centerX,
          game.world.height * 0.25,
          '空间大作战',
          {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#333',
          }
        )
        title.anchor.setTo(0.5, 0.5)
        // 添加提示
        var remind = game.add.text(
          game.world.centerX,
          game.world.centerY,
          '点击任意位置开始',
          {
            fontSize: '20px',
            fill: '#333',
          }
        )
        remind.anchor.setTo(0.5, 0.5)
        // 添加主角
        var man = game.add.sprite(
          game.world.centerX,
          game.world.height * 0.855,
          'dude'
        )
        var manImage = game.cache.getImage('dude')
        man.width = game.world.width * 0.3
        man.height = (man.width / manImage.width) * manImage.height
        man.anchor.setTo(0.5, 0.5)
        // 添加点击事件
        game.input.onTap.add(function() {
          game.state.start('play')
        })
      }
    },
    // 游戏场景
    play: function() {
      var man // 主角
      var apples // 苹果
      var score = 0 // 得分
      var title // 分数
      var scoreMusic
      var bombMusic
      this.create = function() {
        score = 0
        // 开启物理引擎
        game.physics.startSystem(Phaser.Physics.Arcade)
        game.physics.arcade.gravity.y = 600
        // 得分
        // 添加背景音乐
        // 缓存其他音乐
        scoreMusic = game.add.audio('scoreMusic')
        bombMusic = game.add.audio('bombMusic')
        // 添加背景
        var bg = game.add.image(0, 0, 'bg')
        bg.width = game.world.width
        bg.height = game.world.height
        // 添加主角
        man = game.add.sprite(
          game.world.centerX,
          game.world.height * 0.855,
          'dude'
        )
        var manImage = game.cache.getImage('dude')
        man.width = game.world.width * 0.3
        man.height = (man.width / manImage.width) * manImage.height
        man.anchor.setTo(0.5, 0.5)
        game.physics.enable(man) // 加入物理运动
        man.body.allowGravity = false // 清除重力影响
        // 添加分数
        title = game.add.text(
          game.world.centerX,
          game.world.height * 0.25,
          '0',
          {
            fontSize: '40px',
            fontWeight: 'bold',
            fill: '#333',
          }
        )
        title.anchor.setTo(0.5, 0.5)
        // 是否正在触摸
        var touching = false
        // 监听按下事件
        game.input.onDown.add(function(pointer) {
          // 要判断是否点住主角，避免瞬移
          if (Math.abs(pointer.x - man.x) < man.width / 2) touching = true
        })
        // 监听离开事件
        game.input.onUp.add(function() {
          touching = false
        })
        // 监听滑动事件
        game.input.addMoveCallback(function(pointer, x, y, isTap) {
          if (!isTap && touching) man.x = x
        })
        // 添加苹果组
        apples = game.add.group()
        // 苹果类型
        var appleTypes = ['green', 'red', 'yellow', 'bomb']
        var appleTimer = game.time.create(true)
        appleTimer.loop(1000, function() {
          var x = Math.random() * game.world.width
          var index = Math.floor(Math.random() * appleTypes.length)
          var type = appleTypes[index]
          var apple = apples.create(x, 0, type)
          apple.type = type
          // 设置苹果加入物理运动
          game.physics.enable(apple)
          // 设置苹果大小
          var appleImg = game.cache.getImage(type)
          apple.width = game.world.width / 8
          apple.height = (apple.width / appleImg.width) * appleImg.height
          // 设置苹果与游戏边缘碰撞，
          apple.body.collideWorldBounds = true
          apple.body.onWorldBounds = new Phaser.Signal()
          apple.body.onWorldBounds.add(function(apple, up, down) {
            if (down) {
              apple.kill()
              if (apple.type !== 'bomb')
                game.state.start('over', true, false, score)
            }
          })
        })
        appleTimer.start()
      }
      this.update = function() {
        // 监听接触事件
        game.physics.arcade.overlap(man, apples, pickApple, null, this)
      }
      // 接触事件
      function pickApple(man, apple) {
        if (apple.type === 'bomb') {
          // 播放音效
          bombMusic.play()
          game.state.start('over', true, false, score)
        } else {
          var point = 1
          var img = 'one'
          if (apple.type === 'red') {
            point = 3
            img = 'three'
          } else if (apple.type === 'yellow') {
            point = 5
            img = 'five'
          }
          // 添加得分图片
          var goal = game.add.image(apple.x, apple.y, img)
          var goalImg = game.cache.getImage(img)
          goal.width = apple.width
          goal.height = goal.width / (goalImg.width / goalImg.height)
          goal.alpha = 0
          // 添加过渡效果
          var showTween = game.add.tween(goal).to(
            {
              alpha: 1,
              y: goal.y - 20,
            },
            100,
            Phaser.Easing.Linear.None,
            true,
            0,
            0,
            false
          )
          showTween.onComplete.add(function() {
            var hideTween = game.add.tween(goal).to(
              {
                alpha: 0,
                y: goal.y - 20,
              },
              100,
              Phaser.Easing.Linear.None,
              true,
              200,
              0,
              false
            )
            hideTween.onComplete.add(function() {
              goal.kill()
            })
          })
          // 更新分数
          score += point
          title.text = score
          // 清除苹果
          apple.kill()
          // 播放音效
          scoreMusic.play()
        }
      }
    },
    // 结束场景
    over: function() {
      var score = 0
      this.init = function() {
        let username = localStorage.getItem('username')
        let mobile = localStorage.getItem('mobile')
        uploadScore({ score: arguments[0], mobile, username })
        score = arguments[0]
        props.history.push(`/end?score=${score}`)
      }
      this.create = function() {
        // 添加背景
        // var bg = game.add.image(0, 0, 'bg')
        // bg.width = game.world.width
        // bg.height = game.world.height
        // // 添加文本
        // var title = game.add.text(
        //   game.world.centerX,
        //   game.world.height * 0.25,
        //   '游戏结束',
        //   {
        //     fontSize: '40px',
        //     fontWeight: 'bold',
        //     fill: '#333',
        //   }
        // )
        // title.anchor.setTo(0.5, 0.5)
        // var scoreStr = '你的得分是：' + score + '分'
        // var scoreText = game.add.text(
        //   game.world.centerX,
        //   game.world.height * 0.4,
        //   scoreStr,
        //   {
        //     fontSize: '30px',
        //     fontWeight: 'bold',
        //     fill: '#333',
        //   }
        // )
        // scoreText.anchor.setTo(0.5, 0.5)
        // var remind = game.add.text(
        //   game.world.centerX,
        //   game.world.height * 0.6,
        //   '点击任意位置再玩一次',
        //   {
        //     fontSize: '20px',
        //     fontWeight: 'bold',
        //     fill: '#333',
        //   }
        // )
        // remind.anchor.setTo(0.5, 0.5)
        // // 添加点击事件
        // game.input.onTap.add(function() {
        //   game.state.start('play')
        // })
      }
    },
  }

  // 添加场景到游戏示例中
  Object.keys(states).map(function(key) {
    game.state.add(key, states[key])
  })

  // 启动游戏
  game.state.start('preload')
}
