import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { useEffect, useRef, useState } from 'react';
import styles from './ArticleParamsForm.module.scss';
import { useSidebarClose } from './hooks/useSidebarClose';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from '../../constants/articleProps';
import { Select } from '../select';
import { RadioGroup } from '../radio-group';

type TArticleParamsForm = {
	onStateUpdate: (newState: typeof defaultArticleState) => void;
};

export const ArticleParamsForm = ({ onStateUpdate }: TArticleParamsForm) => {
	const [isOpened, setIsOpened] = useState(false);
	const [formState, setFormState] = useState(defaultArticleState);
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		onStateUpdate(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		onStateUpdate(defaultArticleState);
	};

	const handleChange = (name: keyof typeof formState, option: OptionType) => {
		setFormState({
			...formState,
			[name]: option,
		});
	};

	return (
		<>
			<ArrowButton isOpened={isOpened} handleClick={toggleSidebar} />
			<aside className={styles.container} ref={formRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						<p style={{ color: '#000' }}>задайте параметры</p>
					</Text>

					<Select
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title={'шрифт'}
						onChange={(option) => handleChange('fontFamilyOption', option)}
					/>
					<RadioGroup
						options={fontSizeOptions}
						name={'размер шрифта'}
						selected={formState.fontSizeOption}
						title={'размер шрифта'}
						onChange={(option) => handleChange('fontSizeOption', option)}
					/>
					<Select
						options={fontColors}
						selected={formState.fontColor}
						title={'цвет шрифта'}
						onChange={(option) => handleChange('fontColor', option)}
					/>

					<div className={styles.divider}></div> {/* Элемент с линией */}

					<Select
						options={backgroundColors}
						selected={formState.backgroundColor}
						title={'цвет фона'}
						onChange={(option) => handleChange('backgroundColor', option)}
					/>
					<Select
						options={contentWidthArr}
						selected={formState.contentWidth}
						title={'ширина контента'}
						onChange={(option) => handleChange('contentWidth', option)}
					/>

					<div className={styles.bottomContainer}>
						<Button title='сбросить' type='reset' />
    					<Button className='button-submit' title='применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
