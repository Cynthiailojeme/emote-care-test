import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/en';
import countries from '../data/countries.json';

dayjs.extend(utc);
dayjs.extend(timezone);

export function getGMTOffset(countryName) {
	const formattedCountryName = countryName.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
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
