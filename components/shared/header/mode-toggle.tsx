'use client';
import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon, SunMoon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuTrigger,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuContent,
	DropdownMenuCheckboxItem,
} from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';
import { ReactNode } from 'react';

const ModeToggle = () => {
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		// Silent the compiler error and accepting cascading render since need suppress hydration error
		// eslint-disable-next-line
		setMounted(true);
	}, []);

	const { theme, setTheme } = useTheme();
	const setThemeIcon = (): ReactNode => {
		if (theme === 'system') {
			return <SunMoon />;
		} else if (theme === 'dark') {
			return <MoonIcon />;
		} else {
			return <SunIcon />;
		}
	};

	const setAppTheme = (mode: string = 'light') => {
		setTheme(mode);
	};

	if (!mounted) return null;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant={'ghost'}>{setThemeIcon()}</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='border-0'>
				<DropdownMenuLabel>Appearance</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuCheckboxItem
					checked={theme === 'system'}
					onClick={() => setAppTheme('system')}>
					System
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'dark'}
					onClick={() => setAppTheme('dark')}>
					Dark
				</DropdownMenuCheckboxItem>
				<DropdownMenuCheckboxItem
					checked={theme === 'light'}
					onClick={() => setAppTheme('light')}>
					Light
				</DropdownMenuCheckboxItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default ModeToggle;
