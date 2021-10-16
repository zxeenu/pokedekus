import React from 'react';
import Lottie from 'react-lottie';
import * as loading from '../assets/loadingdots.json';


const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading.default,
    renderingSettings: {
        preserveAspectRatio: 'xMidYMid slice'
    }
}

const Loading = () => {
    return (
        <div>
            <Lottie options={defaultOptions} height={120} width={120}></Lottie>
        </div>
    )
}

export default Loading;