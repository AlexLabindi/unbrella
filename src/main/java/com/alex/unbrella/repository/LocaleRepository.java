package com.alex.unbrella.repository;

import com.alex.unbrella.model.Locale;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LocaleRepository extends JpaRepository<Locale,Long> {

}
