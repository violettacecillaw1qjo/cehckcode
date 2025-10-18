export type ImageSlideProps = {
    images: ImageSlideData;
    className?: string;
    classNames?: {
        wrapper?: string;
        container?: string;
        image?: string;
    };
};

export type ImageSlideData = string[];
