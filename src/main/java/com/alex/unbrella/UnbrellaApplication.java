package com.alex.unbrella;

import com.alex.unbrella.model.Bagno;
import com.alex.unbrella.model.Locale;
import com.alex.unbrella.model.Ombrellone;
import com.alex.unbrella.model.Tipo;
import com.alex.unbrella.repository.BagnoRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

import java.util.ArrayList;
import java.util.List;

@SpringBootApplication
public class UnbrellaApplication {

    public static void main(String[] args) {
        // 1. Avviamo Spring e recuperiamo il contesto dell'applicazione
        ConfigurableApplicationContext context = SpringApplication.run(UnbrellaApplication.class, args);

        // 2. Estraiamo il Bean del Repository dal contesto di Spring
        BagnoRepository bagnoRepository = context.getBean(BagnoRepository.class);

        // Controlliamo se ci sono già dati per evitare duplicati ad ogni riavvio
        if (bagnoRepository.count() == 0) {
            System.out.println("--- Popolamento DB dal Main in corso... ---");

            Bagno gino = new Bagno();
            gino.setRg("gino srl");
            gino.setIndirizzo("via colombo 5");

            List<Ombrellone> ginoOmbrelloni = new ArrayList<>();

            Ombrellone a1 = new Ombrellone();
            a1.setL('A');
            a1.setN(1);
            ginoOmbrelloni.add(a1);

            Ombrellone b1 = new Ombrellone();
            b1.setL('B'); // Corretto: prima usavi a1
            b1.setN(1);   // Corretto: prima usavi a1
            ginoOmbrelloni.add(b1);

            Ombrellone z2 = new Ombrellone();
            z2.setL('Z');
            z2.setN(2);
            ginoOmbrelloni.add(z2);

            gino.setOmbrelloneList(ginoOmbrelloni);

            List<Locale> localeList = new ArrayList<>();

            Locale bar = new Locale();
            bar.setN("baraonda");
            bar.setT(Tipo.BAR);
            localeList.add(bar);

            Locale wc = new Locale();
            wc.setN("wc");
            wc.setT(Tipo.WC);
            localeList.add(wc);

            gino.setLocaleList(localeList);

            // 3. Salviamo l'entità nel database
            bagnoRepository.save(gino);

            System.out.println("--- Bagno Gino salvato con successo! ---");



            Bagno franco = new Bagno();
            franco.setRg("franco srl");
            franco.setIndirizzo("via dssfvdf 5");

            List<Ombrellone> francoOmbrelloni = new ArrayList<>();

            Ombrellone f1 = new Ombrellone();
            f1.setL('F');
            f1.setN(1);
            francoOmbrelloni.add(f1);

            Ombrellone h1 = new Ombrellone();
            h1.setL('H');
            h1.setN(1);
            francoOmbrelloni.add(h1);

            Ombrellone g2 = new Ombrellone();
            g2.setL('G');
            g2.setN(2);
            francoOmbrelloni.add(g2);

            franco.setOmbrelloneList(francoOmbrelloni);

            List<Locale> localeList1 = new ArrayList<>();

            Locale rist = new Locale();
            rist.setN("ristoto");
        rist.setT(Tipo.RIST);
            localeList1.add(rist);

            Locale d = new Locale();
            d.setN("dance");
            d.setT(Tipo.DANCE);
            localeList1.add(d);

            franco.setLocaleList(localeList1);

            // 3. Salviamo l'entità nel database
            bagnoRepository.save(franco);

            System.out.println("--- Bagno -Franco salvato con successo! ---");




        }
    }
}