import { request } from 'core/helpers';

/**
 * Get version info
 * @returns {Promise<any>}
 */
const getVersionInfo = () => request({ method: 'GET', url: '/status/version' });

const StatusServices = {
  getVersionInfo,
};

export default StatusServices;
