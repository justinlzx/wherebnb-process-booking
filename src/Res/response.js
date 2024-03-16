class Res {
  successResponse = (res, data) => {
    return res.json({
      success: true,
      data,
    });
  };
  errorResponse = (res, data) => {
    return res.status(400).json({
      success: false,
      data,
    });
  };
  internalServerErrorResponse = (res, data) => {
    return res.status(500).json({
      success: false,
      data,
    });
  };
}

export default new Res();
