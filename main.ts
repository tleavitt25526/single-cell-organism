namespace SpriteKind {
    export const Green = SpriteKind.create()
    export const Red = SpriteKind.create()
    export const Purple = SpriteKind.create()
}
function spawnPurple () {
    purpleCell = sprites.create(assets.image`purpleCell`, SpriteKind.Purple)
    purpleCell.setPosition(randint(0, 160), randint(0, 120))
    purpleCell.setStayInScreen(true)
    purpleCell.setBounceOnWall(true)
}
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Purple, 1000, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 5)
})
function spawnRed () {
    redCell = sprites.create(assets.image`redCell`, SpriteKind.Red)
    redCell.setPosition(randint(0, 160), randint(0, 120))
    redCell.setStayInScreen(true)
    redCell.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Red, SpriteKind.Green, function (sprite, otherSprite) {
    otherSprite.setImage(assets.image`redCell`)
    otherSprite.setKind(SpriteKind.Red)
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Red, 1000, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 20)
    if (spriteutils.getSpritesWithin(SpriteKind.Green, 50, sprite).length > 0) {
        select = spriteutils.getSpritesWithin(SpriteKind.Green, 50, sprite)._pickRandom()
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, select), 30)
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Green, 1000, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 10)
    if (spriteutils.getSpritesWithin(SpriteKind.Red, 50, sprite).length > 0) {
        select = spriteutils.getSpritesWithin(SpriteKind.Red, 50, sprite)._pickRandom()
        spriteutils.setVelocityAtAngle(sprite, 180 + spriteutils.angleFrom(sprite, select), 15)
    }
})
function spawnGreen () {
    greenCell = sprites.create(assets.image`greenCell`, SpriteKind.Green)
    greenCell.setPosition(randint(0, 160), randint(0, 120))
    greenCell.setStayInScreen(true)
    greenCell.setBounceOnWall(true)
}
let greenCell: Sprite = null
let select: Sprite = null
let redCell: Sprite = null
let purpleCell: Sprite = null
for (let index = 0; index < 50; index++) {
    spawnGreen()
}
spawnRed()
spawnPurple()
