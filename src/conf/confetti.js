import confetti from 'canvas-confetti'

const subcribeButtonConfetti = () => {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            confetti({
                particleCount: 100,
                startVelocity: 30,
                spread: 360,
                origin: {
                x: Math.random(),
                y: Math.random() - 0.2
                }
            });
        }, i * 200);
    }
}

const likeButtonConfetti = () => {
    const defaults = {
        spread: 360,
        ticks: 50,
        gravity: 0,
        decay: 0.94,
        startVelocity: 30,
    };
    
    const heart = confetti.shapeFromText({ text: '💖'})
    const like = confetti.shapeFromText({ text: '👍'})

    confetti({
        ...defaults,
        particleCount: 40,
        scalar: 2,
        shapes: [heart]
    });
    
    confetti({
        ...defaults,
        particleCount: 10,
        scalar: 1.75,
        shapes: [like]
    });
}

export {subcribeButtonConfetti, likeButtonConfetti}