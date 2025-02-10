const { User, Archive } = require("../models"); // Ensure models match
const util = require("../../utils"); // Utility functions if needed

// Create Archive

const addArchive = async (req, res, next) => {
    try {
        const { user_id } = req.body;

        // Validate mandatory fields
        if (!util.checkMandatoryFields([user_id])) {
            return res.status(400).json({
                successful: false,
                message: "A mandatory field is missing."
            });
        }

        // Check if the User exists
        const user = await User.findByPk(user_id);
        if (!user) {
            return res.status(404).json({
                successful: false,
                message: "User not found."
            });
        }

        // Create Archive
        const newArchive = await Archive.create({
            surname: user.surname,
            first_name: user.first_name,
            middle_initial: user.middle_initial,
            birthdate: user.birthdate,
            email: user.email,
            contact_number: user.contact_number,
            address: user.address,
            job_title: user.job_title,
            isActive: false,
            department_id: user.DepartmentId
        });
    } catch (error) {
        next(error);
    }
}

// Get Archive by ID
const getArchiveById = async (req, res) => {
    try {
        const archive = await Archive.findByPk(req.params.id, {
            include: User
        });

        if (!archive) {
            return res.status(404).json({
                successful: false,
                message: "Archive record not found."
            });
        }

        return res.status(200).json({
            successful: true,
            data: archive
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            successful: false,
            message: err.message || "An unexpected error occurred."
        });
    }
};

// Get All Archive
const getAllArchive = async (req, res) => {
    try {
        const archive = await Archive.findAll({
            include: User
        });

        return res.status(200).json({
            successful: true,
            data: archive
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            successful: false,
            message: err.message || "An unexpected error occurred."
        });
    }
};

// Update Archive by ID
const updateArchive = async (req, res) => {
    try {
        const archive = await Archive.findByPk(req.params.id);

        if (!archive) {
            return res.status(404).json({
                successful: false,
                message: "Archive record not found."
            });
        }

        const updatedArchive = await archive.update(req.body);

        return res.status(200).json({
            successful: true,
            message: "Archive updated successfully.",
            data: updatedArchive
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            successful: false,
            message: err.message || "An unexpected error occurred."
        });
    }
};

// Delete Archive by ID
const deleteArchive = async (req, res) => {
    try {
        const archive = await Archive.findByPk(req.params.id);

        if (!archive) {
            return res.status(404).json({
                successful: false,
                message: "Archive record not found."
            });
        }

        await archive.destroy();

        return res.status(200).json({
            successful: true,
            message: "Archive deleted successfully."
        });

    } catch (err) {
        console.error(err);
        return res.status(500).json({
            successful: false,
            message: err.message || "An unexpected error occurred."
        });
    }
};

// Export all functions
module.exports = {
    addArchive,
    getArchiveById,
    getAllArchive,
    updateArchive,
    deleteArchive
};