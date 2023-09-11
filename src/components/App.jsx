import { useEffect, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { fetchImages } from 'helpers/api';

export function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (!query) return;
    async function getFetch() {
      const toastId = toast.loading('Loading...');
      const toastIdOptions = {
        id: toastId,
        duration: 3000,
      };
      try {
        const data = await fetchImages(query.slice(14), page);
        if (!data.totalHits) {
          toast('There are no images for your request', toastIdOptions);
        } else {
          setImages(prev => [...prev, ...data.hits]);
          setTotal(data.totalHits);
          toast.success(`Ok. Images comes.`, toastIdOptions);
        }
      } catch (error) {
        toast.error('Something goes wrong. Reload page', toastIdOptions);
      }
    }
    getFetch();
  }, [query, page]);

  const handleSubmit = e => {
    e.preventDefault();
    const newQuery = e.target.query.value.trim();
    if (!newQuery) {
      toast.error('There is no request');
      return;
    }
    const mutedNewQuery = `${Date.now()}/${newQuery}`;
    if (mutedNewQuery !== query) {
      setQuery(mutedNewQuery);
      setImages([]);
      setPage(1);
    }
  };

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const isLoadBtn = total / images.length > 1;
  const isImages = Boolean(images.length);
  return (
    <div>
      <Searchbar onSubmit={handleSubmit} query={query && query.slice(14)} />
      {isImages && <ImageGallery images={images} />}
      {isLoadBtn && <Button onClick={handleLoadMore} />}
      <Toaster position="top-right" reverseOrder={false} gutter={8} />
    </div>
  );
}
