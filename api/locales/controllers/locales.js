'use strict';

const { sanitizeEntity } = require('strapi-utils');

/**
 * Read the documentation (https://strapi.io/documentation/3.0.0-beta.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * Retrieve records.
   *
   * @return {Array}
   */

  async find(ctx) {

    try {

      let entities = await strapi.services.locales.find(ctx.query)
      let locals = []

      entities.map((o) => {
        locals.push({
          numero: o.number,
          superficie: o.surface,
          centroComercial: o.centros_comerciale.nameMall,
          piso: o.floor,
          isEnable: false || o.isEnable,
          isRented: false || o.isRented
        })
      })

      if(locals.length == 0) {
        return ctx.response.badRequest('No existe información',{
          server: {
            error: true
          }
        })
      }

      return locals

    } catch (error) {
        console.log(error)
        ctx.response.badImplementation('terrible implementation');
    }

  }

};
