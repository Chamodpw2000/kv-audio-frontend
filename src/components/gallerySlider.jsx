import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import GalleryCard from './gallaryItemCard';

const GallerySlider = ({ items }) => {
    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="py-4 px-4">
                <Swiper
                    slidesPerView={1}
                    loop={true}
                    pagination={{ clickable: true }}
                    navigation={true}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false
                    }}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="rounded-lg"
                >
                    {items && items.length > 0 ? (
                        items.map((item, index) => (
                            <SwiperSlide key={item.id || index}>
                                <div className="flex justify-center items-center h-96 w-full">
                                    <GalleryCard item={item} />
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide>
                            <div className="flex justify-center items-center h-96 w-full bg-gray-100">
                                <p className="text-xl text-gray-500">No gallery items to display</p>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    );
};

export default GallerySlider;