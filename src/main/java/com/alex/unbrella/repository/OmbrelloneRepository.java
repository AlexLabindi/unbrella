package com.alex.unbrella.repository;

import com.alex.unbrella.model.Locale;
import com.alex.unbrella.model.Ombrellone;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OmbrelloneRepository extends JpaRepository<Ombrellone,Long> {

    boolean getOmbrelloneById(Long id);

    List<Ombrellone> getOmbrelloneByIdAndP(Long id, Boolean p);
}
