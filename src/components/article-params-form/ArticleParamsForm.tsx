import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { useEffect, useRef, useState, ReactNode } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { useSidebarClose } from './hooks/useSidebarClose';

type TArticleParamsForm = {
	children: ReactNode;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onReset: () => void;
};

export const ArticleParamsForm = ({
	children,
	onSubmit,
	onReset,
}: TArticleParamsForm) => {
	const [isOpened, setIsOpened] = useState(false);
	const formRef = useRef<HTMLDivElement | null>(null);

	const toggleSidebar = () => {
		setIsOpened(!isOpened);
	};

	useSidebarClose({
		isOpened,
		onClose: toggleSidebar,
		rootRef: formRef,
	});

	useEffect(() => {
		if (formRef.current) {
			formRef.current.classList.toggle(styles.container_open, isOpened);
		}
	}, [isOpened]);

	return (
		<>
			<ArrowButton isOpened={isOpened} handleClick={toggleSidebar} />
			<aside className={styles.container} ref={formRef}>
				<form className={styles.form} onSubmit={onSubmit} onReset={onReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						<p style={{ color: '#000' }}>задайте параметры</p>
					</Text>

					{children}

					<div className={styles.bottomContainer}>
						<Button title='сбросить' type='reset' />
						<Button title='применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
