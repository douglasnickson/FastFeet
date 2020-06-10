import * as Yup from 'yup';

import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const { id } = req.params;
    const deliverymen = await Deliveryman.findAll({
      where: { id },
    });
    return res.json(deliverymen);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await Deliveryman.findOne({
      where: { email: req.body.email },
    });

    if (userExists) {
      return res.status(400).json({ message: 'Deliveryman already exists.' });
    }

    const { id, name, email } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliverymanEmail = req.body.email;
    const deliverymanId = req.params.id;

    const deliveryman = await Deliveryman.findByPk(deliverymanId);

    if (deliverymanEmail !== deliveryman.email) {
      const deliverymanExists = await Deliveryman.findOne({
        where: { email: deliverymanEmail },
      });
      if (deliverymanExists) {
        return res.status(400).json({ message: 'E-mail already exists.' });
      }
    }

    const { id, name, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async delete(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);
    await deliveryman.destroy();

    return res.json({ success: 'Delivery Man was removed.' });
  }
}

export default new DeliverymanController();
