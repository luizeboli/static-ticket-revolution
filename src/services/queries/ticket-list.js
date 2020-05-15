import client from 'services/client';

export async function fetchTicketList(key, skip) {
  console.info('Fetching ticket list...');

  const response = await client('/tickets/inbox/createdate?count=150&skip=0');
  return response;
}

export async function fetchFilters() {
}
