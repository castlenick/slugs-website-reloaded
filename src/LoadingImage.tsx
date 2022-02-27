import * as React from 'react';

export interface LoadingImageProps {
    src?: string;

    asyncSrc?: Promise<string>;

    alt: string;

    size: SizeOptions;

    sizeClasses?: string;
}

export enum SizeOptions {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    Giant = 'giant',
}

const sizeOptions = new Map([
    [SizeOptions.Small, 'w-48 h-48'],
    [SizeOptions.Medium, 'w-56 h-56'],
    [SizeOptions.Large, 'w-[350px] h-[350px]'],
    [SizeOptions.Giant, 'w-[432px] h-[432px]']
]);

export function LoadingImage(props: LoadingImageProps) {
    const {
        src,
        asyncSrc,
        alt,
        size,
        sizeClasses = sizeOptions.get(size),
    } = props;

    const [loaded, setLoaded] = React.useState<boolean>(false);
    const [failedLoad, setFailedLoad] = React.useState<boolean>(false);
    const [realSrc, setRealSrc] = React.useState<string | undefined>(src);

    const divClasses = React.useMemo(() => {
        if (loaded) {
            return 'hidden';
        }

        return 'block';
    }, [loaded]);

    const imgClasses = React.useMemo(() => {
        if (loaded) {
            return 'block';
        }

        return 'hidden';
    }, [loaded]);

    const loadedText = React.useMemo(() => {
        if (failedLoad) {
            return 'Failed to load image!';
        }

        return 'Loading Image...';
    }, [failedLoad]);

    function handleImageLoaded() {
        setLoaded(true);
    }

    function handleLoadError() {
        setFailedLoad(true);
    }

    const loadAsyncImage = React.useCallback(async () => {
        if (!asyncSrc) {
            return;
        }

        try {
            const image = await asyncSrc;

            setRealSrc(image);
            handleImageLoaded();
        } catch (err) {
            setFailedLoad(true);
        }
    }, [asyncSrc]);

    /* Unload image when source changes */
    React.useEffect(() => {
        setRealSrc(src);
        setLoaded(false);
    }, [
        src,
    ])

    React.useEffect(() => {
        setLoaded(false);
        loadAsyncImage();
    }, [
        asyncSrc,
        loadAsyncImage,
    ]);

    if (!src && !asyncSrc) {
        return null;
    }

    return (
        <div className={`${sizeClasses} flex grow-0 shrink-0`}>
            <div
                className={`${sizeClasses} border-slugGreen border-2 rounded flex items-center justify-center ${divClasses} text-center`}
            >
                {loadedText}
            </div>

            <img
                alt={alt}
                src={realSrc}
                key={src}
                className={`${sizeClasses} border-slugGreen border-2 self-center object-contain rounded ${imgClasses}`}
                onLoad={handleImageLoaded}
                onError={handleLoadError}
            />
        </div>
    );
}
