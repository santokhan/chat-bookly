import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class TranslationService {
  constructor() {
    this.translations = null;
    this.defaultLanguage = 'en';
    this.loadTranslations();
  }

  loadTranslations() {
    try {
      const translationsPath = path.join(__dirname, 'translations.json');
      const translationsData = fs.readFileSync(translationsPath, 'utf8');
      this.translations = JSON.parse(translationsData);
    } catch (error) {
      console.error('Error loading translations:', error);
      this.translations = {};
    }
  }

  /**
   * Get a translated message
   * @param {string} key - Translation key
   * @param {string} language - Language code (en, it)
   * @param {Object} placeholders - Object with placeholder values
   * @returns {string} Translated message
   */
  getMessage(key, language = 'en', placeholders = {}) {
    try {
      if (!this.translations[key]) {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }

      let message = this.translations[key][language] || this.translations[key][this.defaultLanguage];
      
      if (!message) {
        console.warn(`Translation not found for key: ${key}, language: ${language}`);
        return key;
      }

      // Replace placeholders
      Object.keys(placeholders).forEach(placeholder => {
        const regex = new RegExp(`{${placeholder}}`, 'g');
        message = message.replace(regex, placeholders[placeholder]);
      });

      return message;
    } catch (error) {
      console.error('Error getting translation:', error);
      return key;
    }
  }

  /**
   * Get a translated message with Italian as default (as requested by user)
   * @param {string} key - Translation key
   * @param {Object} placeholders - Object with placeholder values
   * @returns {string} Italian translated message
   */
  getItalianMessage(key, placeholders = {}) {
    return this.getMessage(key, 'it', placeholders);
  }

  /**
   * Get a translated message with English as default
   * @param {string} key - Translation key
   * @param {Object} placeholders - Object with placeholder values
   * @returns {string} English translated message
   */
  getEnglishMessage(key, placeholders = {}) {
    return this.getMessage(key, 'en', placeholders);
  }

  /**
   * Reload translations from file
   */
  reloadTranslations() {
    this.loadTranslations();
  }
}

export default new TranslationService();
