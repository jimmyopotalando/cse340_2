router.get('/cause-error', (req, res, next) => {
    next(new Error('Intentional server error triggered.'));
  });
  