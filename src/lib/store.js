import { writable } from 'svelte/store';

export const selectedFilters = writable({
    appointmentType: [],
    price: { min: 0, max: 200 },
    yearsOfExperience: { min: 0, max: 25 },
    sex: '',
    helpNeeded: '',
    therapistType: '',
    country: [],
    language: []
});

export const filteredTherapistProfiles = writable([]);
