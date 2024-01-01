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

export function scrollToLeftOrRight(id, scrollDirection) {
	const container = document.getElementById(id);
	container.scrollBy({ left: scrollDirection * 200, behavior: 'smooth' });
}

export function scrollToTopOrBottom(id) {
	const scrollHeight =
		document.getElementById(id).scrollHeight -
		document.getElementById(id).innerHeight;

	// Check if the user is closer to the top or bottom and scroll accordingly
	if (document.getElementById(id).scrollY < scrollHeight / 2) {
		// Scroll to the top
		const container = document.getElementById(id);
		container.scrollTo({ top: 0, behavior: 'smooth' });
	} else {
		// Scroll to the bottom
		const container = document.getElementById(id);
		container.scrollTo({ top: innerHeight, behavior: 'smooth' });
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
