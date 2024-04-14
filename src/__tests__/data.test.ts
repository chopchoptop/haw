import { formatDateTime } from '../data/dates';

test('dates', () => {
    expect(formatDateTime(1713014167961)).toBe('2024-04-13T13:16:07.961Z');
});
