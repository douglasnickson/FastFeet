import * as Yup from 'yup';
import { Op } from 'sequelize';

import Delivery from '../models/Delivery';

class DeliveryPackage {
  async index(req, res) {
    const { id } = req.params;
    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: null,
        canceled_at: null,
      },
    });
    return res.json(deliveries);
  }

  async update(req, res) {
    const { id } = req.params;
    const { deliveryman_id } = req.body;

    const totalPickups = await Delivery.findAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.ne]: null,
        },
      },
    });

    if (totalPickups.length > 5) {
      return res
        .status(400)
        .json({ error: 'You can not pickup more than 5 packages per day.' });
    }

    const delivery = await Delivery.findByPk(id);

    return res.json(delivery);
  }
}

export default new DeliveryPackage();
