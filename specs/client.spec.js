'use strict';

const PUBLIC_API_KEY = '<YOUR_KEY>';

describe('Gasslytics JS Client', () => {

  describe('client', () => {
    it('should be defined', () => {
      expect(GlasslyticsJS).toBeDefined();
    });
  });

  let client;

  describe('constructor', () => {
    it('should create an instance without errors', () => {
      let error;
      try {
        client = new GlasslyticsJS(PUBLIC_API_KEY);
      } catch (err) {
        error = err;
      } finally {
        expect(client).toBeDefined();
        expect(error).toBeUndefined();
      }
    });
  });

  describe('_getAjax()', () => {
    it('should be defined', () => {
      expect(GlasslyticsJS._getAjax).toBeDefined();
    });

    it('should return an ajax instace', () => {
      const output = GlasslyticsJS._getAjax();
      expect(output).toBeTruthy();
      expect(typeof output).toBe('object');
      expect(output.onload).toBeDefined();
      expect(output.onerror).toBeDefined();
    });
  });

  describe('Actions', () => {
    describe('push()', () => {
      it('should be defined', () => {
        expect(client.actions.push).toBeDefined();
      });

      it('should push a action, only with label', async () => {
        let error;
        let output;
        try {
          output = await client.actions.push('test');
        } catch (err) {
          error = err;
        } finally {
          expect(error).toBeUndefined();
          expect(output).toBe('true');
        }
      });

      it('should push a testing action', async () => {
        let error;
        let output;
        try {
          output = await client.actions.push('test', true);
        } catch (err) {
          error = err;
        } finally {
          expect(error).toBeUndefined();
          expect(output).toBe('true');
        }
      });

      it('should push a testing action with data', async () => {
        let error;
        let output;
        try {
          output = await client.actions.push('test', true, { attr1: 'qwe' });
        } catch (err) {
          error = err;
        } finally {
          expect(error).toBeUndefined();
          expect(output).toBe('true');
        }
      });
    });

    describe('cleanTests()', () => {
      it('should be defined', () => {
        expect(client.actions.cleanTests).toBeDefined();
      });

      it('should remove all testing actions', async () => {
        let error;
        let output;
        try {
          output = await client.actions.cleanTests();
        } catch (err) {
          error = err;
        } finally {
          expect(error).toBeUndefined();
          expect(output).toBe('true');
        }
      });
    });
  });
});
