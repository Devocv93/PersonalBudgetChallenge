USE [PRESUPUESTOS]
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Categoria](
	[Id_Categoria] [int] IDENTITY(1,1) NOT NULL,
	[Nombre] [nvarchar](50) NOT NULL,
	[Fecha] [datetime] NOT NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Operacion]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Operacion](
	[Id_Operacion] [int] IDENTITY(1,1) NOT NULL,
	[Concepto] [nvarchar](250) NOT NULL,
	[Monto] [decimal](16, 2) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Tipo_Operacion] [int] NOT NULL,
	[Id_Categoria] [int] NOT NULL,
	[Id_Usuario] [int] NOT NULL,
 CONSTRAINT [PK_Operacion] PRIMARY KEY CLUSTERED 
(
	[Id_Operacion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Usuario](
	[Id_Usuario] [int] IDENTITY(1,1) NOT NULL,
	[Email] [nvarchar](50) NOT NULL,
	[Password] [varchar](max) NOT NULL,
	[Fecha] [datetime] NOT NULL,
	[Estatus] [int] NOT NULL,
 CONSTRAINT [PK_Usuario] PRIMARY KEY CLUSTERED 
(
	[Id_Usuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  StoredProcedure [dbo].[spAddNewRegister]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spAddNewRegister] 
	@Concepto nvarchar(250),
	@Monto decimal(16,2),
	@Fecha datetime,
	@Tipo_Operacion int,
	@Id_Categoria int,
	@Id_Usuario int
AS
BEGIN 
	SET NOCOUNT ON; 
	INSERT INTO Operacion(Concepto, Monto, Fecha, Tipo_Operacion,Id_Categoria,Id_Usuario) 
	VALUES (@Concepto,@Monto,@Fecha,@Tipo_Operacion,@Id_Categoria,@Id_Usuario)
END
GO
/****** Object:  StoredProcedure [dbo].[spAddNewUser]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spAddNewUser] 
	@Email nvarchar(50),
	@Password varchar(MAX)
AS
BEGIN 
	SET NOCOUNT ON; 
	INSERT INTO Usuario (Email, Password, Fecha, Estatus) VALUES (@Email, @Password, GETDATE(),1)
END
GO
/****** Object:  StoredProcedure [dbo].[spDeleteOperationById]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spDeleteOperationById]
	@Id_Operacion int 
AS
BEGIN 
	SET NOCOUNT ON;
	DELETE FROM Operacion WHERE Id_Operacion = @Id_Operacion
END
GO
/****** Object:  StoredProcedure [dbo].[spEmailExist]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spEmailExist] 
	@email nvarchar(50)    
AS
BEGIN 
	SET NOCOUNT ON; 
	SELECT * FROM Usuario WHERE Email=@email 
END
GO
/****** Object:  StoredProcedure [dbo].[spGetOperationById]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetOperationById] 
	@Id_Operacion int 
AS
BEGIN 
	SET NOCOUNT ON; 
	SELECT * FROM Operacion  WHERE Id_Operacion = @Id_Operacion
END
GO
/****** Object:  StoredProcedure [dbo].[spGetOperationsByUser]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[spGetOperationsByUser] 
	@Id_Usuario int 
AS
BEGIN 
	SET NOCOUNT ON; 
	SELECT Id_Operacion, Concepto,Monto,Fecha,Tipo_operacion,Id_categoria,  
    CASE Tipo_Operacion
        WHEN 1 THEN 'INCOME'
        WHEN 2 THEN 'OUTFLOW' 
        ELSE 'Unknown' END
    AS operacion,
	CASE Id_categoria
		WHEN 0 THEN 'NA'
        WHEN 1 THEN 'FOOD'
        WHEN 2 THEN 'SCHOOL'
		WHEN 3 THEN 'GYM'
		WHEN 4 THEN 'CLOTES'
		WHEN 5 THEN 'RENT'
        ELSE 'UNKNOW' END
    AS categoria
	FROM Operacion  WHERE Id_Usuario = @Id_Usuario
END
GO
/****** Object:  StoredProcedure [dbo].[spGetTotalQuantitiesIO]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE  [dbo].[spGetTotalQuantitiesIO]
	@Id_Usuario int 
AS
BEGIN 
	SET NOCOUNT ON;
	SELECT SUM(CASE WHEN Tipo_Operacion = 1 THEN Monto END) totalEntradas,
       SUM(CASE WHEN Tipo_Operacion = 2 THEN Monto END) totalSalidas
	FROM Operacion 
	WHERE Tipo_Operacion IN (1,2)  AND Id_Usuario = @Id_Usuario
END
GO
/****** Object:  StoredProcedure [dbo].[spUserExist]    Script Date: 26/04/2022 10:27:57 a. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE [dbo].[spUserExist]
	@Email nvarchar(50),
	@Password varchar(MAX)
AS
BEGIN 
	SET NOCOUNT ON; 
	SELECT Id_Usuario, Email FROM Usuario WHERE Email=@Email and Password=@Password
END
GO
