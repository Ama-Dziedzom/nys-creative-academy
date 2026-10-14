import * as local from './data';

/**
 * The single seam between the site and its content source. Pages call these
 * async getters only. To connect a CMS, replace each body with a fetch from
 * the CMS and map the result onto the types in ./types.
 */

export const getSiteSettings = async () => local.siteSettings;
export const getAcademies = async () => local.academies;
export const getHomePage = async () => local.homePage;
export const getAboutPage = async () => local.aboutPage;
export const getAcademiesPage = async () => local.academiesPage;
export const getApplyPage = async () => local.applyPage;
export const getSupportPage = async () => local.supportPage;

export type * from './types';
