import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en';
import countries from '../data/countries.json';

dayjs.extend(utc);
dayjs.extend(timezone);

export function scrollToTheTop() {
	document.body.scrollIntoView();
}

export function scrollToLeftOrRight(id, left, leftBtnId, rightBtnId) {
	const container = document.getElementById(id);
	const leftButton = document.getElementById(leftBtnId);
	const rightButton = document.getElementById(rightBtnId);
	const maxScrollLeft = container.scrollWidth - container.clientWidth;
	leftButton.style.display = container.scrollLeft === maxScrollLeft ? 'block' : 'none';
	rightButton.style.display = maxScrollLeft - container.scrollLeft < 100 ? 'none' : 'bock';

	if (left) {
		// Scroll to the left
		leftButton.style.display = 'none';
		rightButton.style.display = 'block';
		container.scrollBy({ left: -5 * 200, behavior: 'smooth' });
	} else {
		// Scroll to right
		leftButton.style.display = 'block';
		container.scrollBy({ left: 200, behavior: 'smooth' });
	}
}

export function scrollToTopOrBottom(id, top, topBtnId, bottomBtnId) {
	const container = document.getElementById(id);
	const topButton = document.getElementById(topBtnId);
	const bottomButton = document.getElementById(bottomBtnId);

	if (top) {
		// Scroll to the top
		container.scrollTo({ top: 0, behavior: 'smooth' });
		topButton.style.display = 'none';
		bottomButton.style.display = 'block';
	} else {
		// Scroll to bottom
		container.scrollTo({ top: innerHeight, behavior: 'smooth' });
		topButton.style.display = 'block';
		bottomButton.style.display = 'none';
	}
}

export function getGMTOffset(countryName) {
	const formattedCountryName = countryName?.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
	const country = Object.values(countries).find((country) => country.name === formattedCountryName);
	const timeZone = country ? country.timezones[0] : null;

	if (timeZone) {
		const now = dayjs().tz(timeZone);
		const offset = now.utcOffset();
		const hours = Math.floor(Math.abs(offset) / 60);
		const minutes = Math.abs(offset) % 60;
		const sign = offset >= 0 ? '+' : '-';

		const formattedHours = hours.toString().padStart(2, '0');
		const formattedMinutes = minutes.toString().padStart(2, '0');

		const formattedOffset = `GMT ${sign}${formattedHours}:${formattedMinutes}`;
		return formattedOffset;
	} else {
		return '-';
	}
}

export function capitalizeFirstLetter(str) {
	return str ? str[0].toUpperCase() + str.slice(1) : '-';
}

export function getCountryAcronym(country) {
	const countryMappings = {
		'United States': 'USA',
		'United Kingdom': 'UK'
	};

	const countryName = countryMappings[country] || country;
	return countryName;
}

export function truncateText(originalText, wordLimit) {
	const words = originalText.split(' ');

	if (words.length > wordLimit) {
		return words.slice(0, wordLimit).join(' ') + ' ...';
	}

	return originalText;
}
