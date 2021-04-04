import { Time } from '../models';

export default {
	async getAllTimes(req, res) {
		try {
			const times = await Time.findAll();
			return res.status(200).send({ times });
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async getById(req, res) {
		const id = Number.parseInt(req.params.id, 10);
		try {
			const time = await Time.findByPk(id);
			return res.status(200).send({ time });
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async createTime(req, res) {
		try {
			const time = await Time.create(req.body);
			return res.status(201).json({ time });
		} catch (error) {
			return res.status(400).send(error);
		}
	},
	// Not used on the app .
	async updateTime(req, res) {
		const id = Number(req.params.id);

		try {
			const [numberOfAffectedRows, affectedRows] = await Time.update(
				{
					title: req.body.title,
					description: req.body.description,
				},
				{
					where: { id },
					returning: true, // needed for affectedRows to be populated
					plain: true, // makes sure that the returned instances are just plain objects
				}
			);
			return res.status(200).send({ time: affectedRows });
		} catch (error) {
			return res.status(400).send(error);
		}
	},

	async deleteTime(req, res) {
		console.log('deleteTime');

		const id = Number.parseInt(req.params.id, 10);

		try {
			await Time.destroy({
				where: { id },
			});
			return res.status(204).json({ message: 'Time deleted' });
		} catch (error) {
			return res.status(400).send(error);
		}
	},
};
