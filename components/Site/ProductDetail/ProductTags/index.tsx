import { FC } from 'react';
import Link from 'next/link';
import { hashtagsSlicer } from 'core/helpers/hashagsSlicer';
import styles from './styles.module.scss';
import { TProduct } from 'core/constants/types';

interface IProps {
  product: TProduct;
}

const ProductTags: FC<IProps> = ({ product }) => {
  if (!product.tags?.length) return null;
  return (
    <div className={styles.tags}>
      <h1 className={styles.tags__tagsTitle}>Tags</h1>
      {product.tags.map((tag: any) => (
        <div key={tag.id} className={product.status !== "Published" ? `draft_tag` : ''}>
          <Link key={tag.id} href={product.status === "Published" ? `/search/?tag=${hashtagsSlicer(tag.value)}` : ''}>
            <div className={`draft_tag_inactive ${styles.tags__tag}`}>#{hashtagsSlicer(tag?.value)}</div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ProductTags;
