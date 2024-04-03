import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { useEffect, useRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	isOpened: boolean;
	handleClick: OnClick;
};

export const ArrowButton = (props: ArrowButtonProps) => {
	const { isOpened, handleClick } = props;

	const refButton = useRef<HTMLDivElement | null>(null);
	const refArrow = useRef<HTMLImageElement | null>(null);

	useEffect(() => {
		if (refButton.current) {
			refButton.current.classList.toggle(styles.container_open);
		}
		if (refArrow.current) {
			refArrow.current.classList.toggle(styles.arrow_open);
		}
	}, [isOpened]);

	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={styles.container}
			onClick={handleClick}
			ref={refButton}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={styles.arrow}
				ref={refArrow}
			/>
		</div>
	);
};
