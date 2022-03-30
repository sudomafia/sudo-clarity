import pgp from 'pg-promise';

export const db = pgp()(process.env.CONNECTION_STRING);