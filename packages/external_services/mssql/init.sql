CREATE DATABASE booster_template
GO

IF EXISTS(SELECT * FROM master.sys.databases 
          WHERE name='booster_template')
BEGIN
    PRINT 'Database Exists'
END
GO
