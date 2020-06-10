import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const { id } = req.params;
    const delivery = await Delivery.findByPk(id);
    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.create(req.body);

    return res.json({ delivery });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    const deliveryUpdated = await delivery.update(req.body);

    return res.json({ deliveryUpdated });
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id);
    await delivery.destroy();
    return res.json({ success: 'Delivery was removed.' });
  }
}

export default new DeliveryController();
