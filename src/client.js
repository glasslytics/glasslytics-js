class GlasslyticsJS {

  /**
     * Construct the client
     * @param {string} publicKey - ID of your account
     */
  constructor(publicKey) {
    this.publicKey = publicKey;
    this.API_URL = 'https://glasslytics.com/api/v1';
    this.API_AUTH_TYPE = 'Basic ';
    this.API_CONTENT_TYPE = 'application/json; charset=utf-8';
    this.actions = {
      _class: this,
      push: this.pushAction,
      cleanTests: this.cleanTestingActions
    }
  }

  /**
   * Crossbrowser function to get xmlhttprequest object
   * @return Object
   */
  static _getAjax() {
    try { return new XMLHttpRequest(); } catch (e) { }
    try { return new ActiveXObject('Msxml2.XMLHTTP.6.0'); } catch (e) { }
    try { return new ActiveXObject('Msxml2.XMLHTTP.3.0'); } catch (e) { }
    try { return new ActiveXObject('Msxml2.XMLHTTP'); } catch (e) { }
    try { return new ActiveXObject('Microsoft.XMLHTTP'); } catch (e) { }
    return false;
  }

  /**
   * Save an action
   * @param {string} label - Name of the action
   * @param {boolean} [isTest] - Flag as testing action or not
   * @param {object} [data] - Additional properties of the action
   * @return Promise
   */
  pushAction(label, isTest = false, data = {}) {
    return new Promise((resolve, reject) => {
      var xhr = GlasslyticsJS._getAjax();
      xhr.open('POST', this._class.API_URL + '/actions', true);
      xhr.setRequestHeader('Authorization', this._class.API_AUTH_TYPE + this._class.publicKey);
      xhr.setRequestHeader('Content-Type', this._class.API_CONTENT_TYPE);
      xhr.onload = () => {
        var isOk = xhr.status >= 200 && xhr.status < 300;
        if (isOk) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      if (isTest) {
        if (!data) {
          data = {};
        }
        data.__test = true;
      }
      xhr.send(JSON.stringify({label, data}));
    });
  }

  /**
   * Remove all testing actions
   * @return Promise
   */
  cleanTestingActions() {
    return new Promise((resolve, reject) => {
      var xhr = GlasslyticsJS._getAjax();
      xhr.open('DELETE', this._class.API_URL + '/testing-actions', true);
      xhr.setRequestHeader('Authorization', this._class.API_AUTH_TYPE + this._class.publicKey);
      xhr.setRequestHeader('Content-Type', this._class.API_CONTENT_TYPE);
      xhr.onload = () => {
        var isOk = xhr.status >= 200 && xhr.status < 300;
        if (isOk) {
          resolve(xhr.response);
        } else {
          reject(xhr.statusText);
        }
      };
      xhr.onerror = () => reject(xhr.statusText);
      xhr.send();
    });
  }

}
