export default function Grain({ opacity = 0.15, blend = 'screen', zIndex = 10, backgroundSize = '200px 200px' }) {
    return (
        <div
            aria-hidden="true"
            className="grain"
            style={{ opacity, mixBlendMode: blend, zIndex, backgroundSize }}
        />
    );
}
