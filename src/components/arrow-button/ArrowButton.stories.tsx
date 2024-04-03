import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

import { ArrowButton, ArrowButtonProps } from './ArrowButton';

const meta: Meta<typeof ArrowButton> = {
	component: ArrowButton,
};

export default meta;

export const ArrowButtonStory: StoryObj<ArrowButtonProps> = {
	render: (args) => {
		const [isOpened, setIsOpened] = useState(false);

		const toggleSidebar = () => {
			setIsOpened(!isOpened);
		};

		return (
			<ArrowButton {...args} isOpened={isOpened} handleClick={toggleSidebar} />
		);
	},
	args: {
		isOpened: false,
		handleClick: () => {},
	},
};
