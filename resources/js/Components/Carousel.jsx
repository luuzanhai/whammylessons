import { useState, useEffect, useCallback } from 'react';
import Grain from '@/Components/Grain';

const textNoWrapStyle = {
    whiteSpace: 'nowrap',
    display: 'inline-block',
    maxWidth: '100%',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
};

function getTextPositionStyle(position) {
    const positions = {
        'top-left': { justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'left' },
        'top-center': { justifyContent: 'flex-start', alignItems: 'center', textAlign: 'center' },
        'top-right': { justifyContent: 'flex-start', alignItems: 'flex-end', textAlign: 'right' },

        'middle-left': { justifyContent: 'center', alignItems: 'flex-start', textAlign: 'left' },
        'middle-center': { justifyContent: 'center', alignItems: 'center', textAlign: 'center' },
        'middle-right': { justifyContent: 'center', alignItems: 'flex-end', textAlign: 'right' },

        'bottom-left': { justifyContent: 'flex-end', alignItems: 'flex-start', textAlign: 'left' },
        'bottom-center': { justifyContent: 'flex-end', alignItems: 'center', textAlign: 'center' },
        'bottom-right': { justifyContent: 'flex-end', alignItems: 'flex-end', textAlign: 'right' },
    };

    return {
        ...(positions[position] || positions['bottom-left']),
        display: 'flex',
        flexDirection: 'column',
        gap: '0.35rem',
        width: '100%',   // Phủ toàn bộ chiều ngang màn hình
        height: '100%',  // Phủ toàn bộ chiều dọc màn hình
        pointerEvents: 'none',
    };
}

export default function Carousel({ slides }) {
    const [current, setCurrent] = useState(0);
    const [prev, setPrev] = useState(null);
    const [dir, setDir] = useState('next');
    const [animating, setAnimating] = useState(false);

    const go = useCallback((idx, direction) => {
        if (animating) return;
        setDir(direction);
        setPrev(current);
        setCurrent(idx);
        setAnimating(true);
        setTimeout(() => { setPrev(null); setAnimating(false); }, 700);
    }, [animating, current]);

    const next = useCallback(() => go((current + 1) % slides.length, 'next'), [current, slides.length, go]);
    const goTo = (index) => go(index, index > current ? 'next' : 'prev');

    useEffect(() => {
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];
    const prevSlide = prev !== null ? slides[prev] : null;

    return (
        <div className="carousel">
            {prevSlide && (
                <div
                    key={`prev-${prev}`}
                    className="carousel__slide carousel__slide--previous"
                    style={{
                        backgroundImage: `url(${prevSlide.image_url || prevSlide.img})`,
                        animation: `slideOut${dir === 'next' ? 'Left' : 'Right'} 0.7s cubic-bezier(0.77,0,0.18,1) forwards`,
                    }}
                >
                    <div className="carousel__overlay carousel__overlay--previous" />
                </div>
            )}

            <div
                key={`slide-${current}`}
                className="carousel__slide carousel__slide--current"
                style={{
                    backgroundImage: `url(${slide.image_url || slide.img})`,
                    animation: prev !== null ? `slideIn${dir === 'next' ? 'Right' : 'Left'} 0.7s cubic-bezier(0.77,0,0.18,1) forwards` : 'none',
                }}
            >
                <div className="carousel__overlay carousel__overlay--current" />
                <Grain opacity={0.22} />

                <div className="film-strip film-strip--top">
                    {Array.from({ length: 40 }).map((_, index) => <div key={index} className="film-strip__hole" />)}
                </div>
                <div className="film-strip film-strip--bottom">
                    {Array.from({ length: 40 }).map((_, index) => <div key={index} className="film-strip__hole" />)}
                </div>

                <div className="carousel__content" style={getTextPositionStyle(slide.text_position)}>
                    <div className="carousel__label" style={textNoWrapStyle}>{slide.label}</div>
                    <div className="carousel__tag" style={{ ...textNoWrapStyle, alignSelf: 'inherit' }}>{slide.tag}</div>
                    <h2 className="carousel__title">{slide.title}</h2>
                    <div className="carousel__divider" />
                    <p className="carousel__subtitle">{slide.subtitle || slide.sub}</p>
                    <div className="carousel__dots" style={{ pointerEvents: 'auto' }}>
                        {slides.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goTo(index)}
                                className={`carousel__dot${index === current ? ' carousel__dot--active' : ''}`}
                                style={{ width: index === current ? '28px' : '6px' }}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <StampMark />
            <button
                onClick={() => go((current - 1 + slides.length) % slides.length, 'prev')}
                className="carousel__nav-button carousel__nav-button--previous"
            >↑</button>
            <button onClick={next} className="carousel__nav-button carousel__nav-button--next">↓</button>
        </div>
    );
}

function StampMark() {
    return (
        <div aria-hidden="true" className="stamp-mark">
            <div className="stamp-mark__text">
                WHAMMY LESSONS<br />EST. 2021<br />BÌNH DƯƠNG
            </div>
            <div className="stamp-mark__ring" />
        </div>
    );
}
