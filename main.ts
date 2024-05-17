namespace SpriteKind {
    export const Green = SpriteKind.create()
    export const Red = SpriteKind.create()
    export const Purple = SpriteKind.create()
}
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Green, 1000, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 10)
    
    // if (spriteutils.getSpritesWithin(SpriteKind.Green, 10, sprite).length > 0) {
    //     select = spriteutils.getSpritesWithin(SpriteKind.Green, 10, sprite)._pickRandom()
    //     spriteutils.setVelocityAtAngle(sprite, 180 + spriteutils.angleFrom(sprite, select), 10)
    // }
    if (spriteutils.getSpritesWithin(SpriteKind.Purple, 10, sprite).length > 0) {
        select = spriteutils.getSpritesWithin(SpriteKind.Purple, 10, sprite)._pickRandom()
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, select), 10)
    }
    if (spriteutils.getSpritesWithin(SpriteKind.Red, 20, sprite).length > 0) {
        select = spriteutils.getSpritesWithin(SpriteKind.Red, 20, sprite)._pickRandom()
        spriteutils.setVelocityAtAngle(sprite, 180 + spriteutils.angleFrom(sprite, select), 10)
    }
    
})
function spawnPurple () {
    purpleCell = sprites.create(assets.image`purpleCell`, SpriteKind.Purple)
    purpleCell.setPosition(randint(0, 160), randint(0, 120))
    purpleCell.setStayInScreen(true)
    purpleCell.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Red, SpriteKind.Purple, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    for (let index = 0; index < blockObject.getNumberProperty(blockObject.getStoredObject(sprite), NumProp.myNum); index++) {
        spawnGreen(otherSprite.x, otherSprite.y)
    }
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Red, 500, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 20)
    if (spriteutils.getSpritesWithin(SpriteKind.Green, 50, sprite).length > 0) {
        select = spriteutils.getSpritesWithin(SpriteKind.Green, 50, sprite)._pickRandom()
        spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, select), 50)
    }
})
function spawnRed (x: number, y: number) {
    redCell = sprites.create(assets.image`redCell`, SpriteKind.Red)
    blockObject.storeOnSprite(blockObject.create(), redCell)
    blockObject.setNumberProperty(blockObject.getStoredObject(redCell), NumProp.myNum, 0)
    redCell.setPosition(x, y)
    redCell.setStayInScreen(true)
    redCell.setBounceOnWall(true)
}
sprites.onOverlap(SpriteKind.Red, SpriteKind.Green, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    spawnRed(otherSprite.x, otherSprite.y)
    blockObject.setNumberProperty(blockObject.getStoredObject(sprite), NumProp.myNum, blockObject.getNumberProperty(blockObject.getStoredObject(sprite), NumProp.myNum) + 1)
})
spriteutils.onSpriteKindUpdateInterval(SpriteKind.Purple, 10000, function (sprite) {
    spriteutils.setVelocityAtAngle(sprite, randint(0, 359), 5)
})
function spawnGreen (x: number, y: number) {
    greenCell = sprites.create(assets.image`greenCell`, SpriteKind.Green)
    greenCell.setPosition(x, y)
    greenCell.setStayInScreen(true)
    greenCell.setBounceOnWall(true)
}
let greenCell: Sprite = null
let redCell: Sprite = null
let purpleCell: Sprite = null
let select: Sprite = null
for (let index = 0; index < 50; index++) {
    spawnGreen(randint(0, 160), randint(0, 120))
}
spawnRed(randint(0, 160), randint(0, 120))
spawnPurple()
// game.onUpdateInterval(5000, function () {
//     if (sprites.allOfKind(SpriteKind.Red).length == 0) {
//         spawnRed(randint(0, 160), randint(0, 120))
//     }
// })
