CREATE TABLE IF NOT EXISTS kegiatan (
  id VARCHAR(64) NOT NULL,
  payload LONGTEXT NOT NULL,
  diterbitkan TINYINT(1) NOT NULL DEFAULT 0,
  jadwal_terbit VARCHAR(40) DEFAULT NULL,
  tanggal CHAR(10) NOT NULL,
  dibuat_pada VARCHAR(40) NOT NULL,
  PRIMARY KEY (id),
  KEY idx_kegiatan_publikasi_tanggal (diterbitkan, tanggal),
  KEY idx_kegiatan_jadwal (diterbitkan, jadwal_terbit)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS tautan_cepat (
  id VARCHAR(64) NOT NULL,
  label VARCHAR(120) NOT NULL,
  url VARCHAR(2048) NOT NULL,
  urutan INT NOT NULL,
  PRIMARY KEY (id),
  KEY idx_tautan_urutan (urutan)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS pengaturan (
  `key` VARCHAR(120) NOT NULL,
  `value` LONGTEXT NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARACTER SET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
