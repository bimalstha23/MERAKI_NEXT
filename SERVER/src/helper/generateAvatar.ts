const GenerateAvatar = () => {
    const avatarnames = [
        'Whiskers',
        'Fluffy',
        'George',
        'jasmine',
        'Toby',
        "Midnight",
        'Gracie',
        'Nala',
        'Sugar',
        'Zoey',
        'Sadie',
        'Garfield',
        'Simba',
        'Coco',
        'Snowball',
        'Sasha',
        'Kiki',
        'Peanut',
        'Sam',
        'buddy'
    ]

    const randomAvatarCollection = [
        'bottts',
        'bottts-neutral',
        'fun-emoji',
        'identicon',
        'thumbs',
    ]

    const randomavatarname = () => {
        const randomNumber = Math.floor(Math.random() * avatarnames.length);

        const a = avatarnames[randomNumber];
        return a
    }

    const randomavatar = () => {
        const randomNumber = Math.floor(Math.random() * randomAvatarCollection.length);
        const a = randomAvatarCollection[randomNumber]
        return a
    };

    const avatar = `https://api.dicebear.com/6.x/${randomavatar()}/svg?seed=${randomavatarname()}`
    return avatar;
}

export default GenerateAvatar