import clsx from 'clsx';
import { isObject } from 'lodash-es';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';

import IconChevronRight from '@/assets/icons/common/ChevronRight';

import ImageViewer from '../ImageViewer';

import { ImageSlideProps } from './ImageSlide.type';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ImageSlide = (props: ImageSlideProps) => {
    const { images, className, classNames = {} } = props;

    const handleInit = (swiper: SwiperClass) => {
        const navigation = swiper.navigation;
        const navigationParams = swiper.params.navigation;

        if (!navigationParams) return;

        if (isObject(navigationParams)) {
            navigationParams.prevEl = '.swiper-button-prev-custom';
            navigationParams.nextEl = '.swiper-button-next-custom';
        }
        navigation.init();
        navigation.update();
    };

    return (
        <div className={clsx('relative w-full overflow-hidden', className, classNames.wrapper)}>
            <div className='swiper-button-prev-custom flex-center absolute left-0 top-1/2 z-10 h-full -translate-y-1/2 cursor-pointer select-none hover:text-primary/50'>
                <IconChevronRight className='rotate-180' />
            </div>

            <div className='swiper-button-next-custom flex-center absolute right-0 top-1/2 z-10 h-full -translate-y-1/2 cursor-pointer select-none hover:text-primary/50'>
                <IconChevronRight />
            </div>

            <Swiper
                centeredSlides
                loop
                slidesPerView={3}
                wrapperClass='gap-2 px-4'
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={{
                    prevEl: '.swiper-button-prev-custom',
                    nextEl: '.swiper-button-next-custom',
                }}
                modules={[Autoplay, Navigation]}
                onInit={handleInit}
            >
                {images.map((image, index) => (
                    <SwiperSlide
                        key={index}
                        className={clsx(classNames.image)}
                    >
                        <ImageViewer
                            src={image}
                            width={'100%'}
                            height={'100%'}
                            className='pointer-events-none aspect-square h-full w-full select-none rounded-lg'
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default ImageSlide;
