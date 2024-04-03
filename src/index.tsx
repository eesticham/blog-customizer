import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	OptionType,
} from './constants/articleProps';
import { Select } from './components/select';
import { RadioGroup } from './components/radio-group';
import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [pageState, setPageState] = useState(defaultArticleState);
	const [formState, setFormState] = useState(defaultArticleState);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setPageState(formState);
	};

	const handleReset = () => {
		setFormState(defaultArticleState);
		setPageState(defaultArticleState);
	};

	// catch any input change
	const handleChange = (name: keyof typeof formState, option: OptionType) => {
		setFormState({
			...formState,
			[name]: option,
		});
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': pageState.fontFamilyOption.value,
					'--font-size': pageState.fontSizeOption.value,
					'--font-color': pageState.fontColor.value,
					'--container-width': pageState.contentWidth.value,
					'--bg-color': pageState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onSubmit={handleSubmit} onReset={handleReset}>
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
			</ArticleParamsForm>
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
