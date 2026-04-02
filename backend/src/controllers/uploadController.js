// @desc    Upload single image
// @route   POST /api/upload
// @access  Private/Admin
export const uploadImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn file ảnh',
      });
    }

    // Trả về đường dẫn ảnh
    const imagePath = `/images/courses/${req.file.filename}`;

    res.status(200).json({
      success: true,
      message: 'Upload ảnh thành công',
      data: {
        path: imagePath,
        filename: req.file.filename,
        size: req.file.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upload multiple images
// @route   POST /api/upload/multiple
// @access  Private/Admin
export const uploadMultipleImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Vui lòng chọn ít nhất 1 file ảnh',
      });
    }

    // Trả về mảng đường dẫn ảnh
    const imagePaths = req.files.map(file => ({
      path: `/images/courses/${file.filename}`,
      filename: file.filename,
      size: file.size,
    }));

    res.status(200).json({
      success: true,
      message: `Upload ${req.files.length} ảnh thành công`,
      data: imagePaths,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
