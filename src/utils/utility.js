export const displayUserPhoto = (event) => (dispatch) => {
  const file = event.target.files[0];
  // File Preview
  const reader = new FileReader();

  reader.onload = () => {
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE,
      payload: reader.result,
    });

    dispatch({
      type: DISPLAY_NEW_USER_PICTURE_DATA,
      payload: file,
    });
  };
  reader.abort = () => {
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE,
      payload: "images/user.png",
    });
    dispatch({
      type: DISPLAY_NEW_USER_PICTURE_DATA,
      payload: null,
    });
  };
  reader.onloadend = () => {
    if (file === undefined) {
      dispatch({
        type: DISPLAY_NEW_USER_PICTURE,
        payload: "images/user.png",
      });
      dispatch({
        type: DISPLAY_NEW_USER_PICTURE_DATA,
        payload: null,
      });
    }
  };
  reader.readAsDataURL(file);
};

export const handlePicture = (event) => {
  const file = event.target.files[0];
};

export const textFonctionnaireConges = `<p>
  Vu la Constitution;<br>
  Vu la Loi n°2022/020 du 27 décembre 2022 portant Loi des Finances de la République du Cameroun pour L'Exercice 2023 ;<br>
  Vu le Décret n°94/199 du 07 octobre 1994 portant statut général de la Fonction Publique de L'Etat modifié et complété par le Décret n°2000/287 du 13 octobre 2000 ;<br>
  Vu le Décret n°2000/689 du 13 septembre 2000 fixant le régime du congé administratif annuel des fonctionnaires ;<br>
  Vu le Décret n°2000/693/PM du 13 septembre fixant le régime des déplacements des Agents Publics Civils et les modalités de prise en charge des frais y afférents;<br>
  Vu le Décret n°2005/118 du 15 avril 2005 portant organisation du Ministère de l'Agriculture et du Développement Rural ;<br>
  Vu le Décret n°2019/001 du 04 janvier 2019 portant nomination d'un Premier Ministre, Chef du Gouvernement ;<br>
  Vu le Décret n°2019/002 du 04 janvier 2019 portant réaménagement du Gouvernement;<br>
  Vu la Circulaire n°00006/C/MINFI du 30 décembre 2022 portant instructions relatives à l'Exécution des Lois des Finances, au Suivi et au Contrôle de l'exécution du Budget de L'Etat, des Etablissements Publics Administratifs, des Collectives Territoriales Décentralisées et des autres organismes subventionnés, pour L'Exercice 2023 ;<br>
  Considérant des nécessités de service ;
  </p>
  `;

export const textContractuelConges = `
  <p>Vu la Constitution; <br>
  Vu la Loi 92/007 du 14 août 1992 portant Code du travail ;<br>
  Vu la Loi n°2022/020 du 27 décembre 2022 portant Loi des Finances de la République du Cameroun pour L'Exercice 2023;<br/>
  Vu le Décret n°75/28 du 10 Janvier 1975 portant modalités d'application des congés payés ; <br>
  Vu le Décret n°78/484 du 09 novembre 1978 portant les dispositions communes applicables aux Agents de l'Etat relevant du Code du Travail; <br>
  Vu le Décret n°2000/211 du 27 juillet 2000 portant rémunération des agents de l'Etat relevant du Code de Travail ; <br>
  Vu le Décret n°2000/693/PM du 13 septembre fixant le régime des déplacements des Agents Publics Civils et les modalités de prise en charge des frais y afférents; <br>
  Vu le Décret n°2005/118 du 15 avril 2005 portant organisation du Ministère de l'Agriculture et du Développement Rural ;<br>
  Vu le Décret n°2012/079 du 15 avril 09 mars 2012 portant régime de la déconcentration de la gestion des personnels de L'Etat et de la Solde. ;<br>
  Vu le Décret n°2019/001 du 04 janvier 2019 portant nomination d'un Premier Ministre, Chef du Gouvernement ;<br>
  Vu le Décret n°2019/002 du 04 janvier 2019 portant réaménagement du Gouvernement ;<br>
  Vu la Circulaire n°00006/C/MINFI du 30 décembre 2022 portant instructions relatives à l'Exécution des Lois des Finances, au Suivi et au Contrôle de l'exécution du Budget de L'Etat, des Etablissements Publics Administratifs, des Collectives Territoriales Décentralisées et des autres organismes subventionnés, pour L'Exercice 2023 ;<br>
  Considérant des nécessités de service ;</p>`;

export const textFooterConges = `
<br />
<p>
<strong style="font-size: 14px">  <u>Article 2</u></strong> : les frais de transport aller et retour du lieu de service au lieu de jouissance du congé seront payés aux intéressés, conformément à l'article 14 du décret 2000/693/PM du 13/09/2000 susvisé.
</p>
<p>
<strong>IMPUTATION BUDGÉTAIRE :</strong> 50 30 391 01; article 39 00 00 ; paragraphe 6133; EXERCICE 2023 ./-
</p>
<p>
<strong style="font-size: 14px"><u>Article 3</u></strong> : La présente décision sera enregistrée et communiquée partout où besoin sera ./
</p>`;

export const textHeaderCertificatCollectif = `\u200B\t \u200B\t Le personnel dont le nom suit, déclaré définitivement admis au concours direct
des 03 et 04 octobre 2020 pour le recrutement des personnels dans le corps des
fonctionnaires du Génie Rural et mis à disposition du Ministère de
l'Agriculture et Développement Rural par Décision N°:
00401/MINFOPRA/SG/DDRHE/SDC/SCDB du 05 Mars 2021 du Ministère de la Fonction
Publique et de la Réforme Administrative, a effectivement pris service le 02
juin 2021.`;

export const textFooterCertificatCollectif = `<p>
\u200B\t \u200B\t \u200B\tEn foi de quoi la présente de prise de Service est établie
 pour servir et valoir ce que de droit. /-
</p>`;
