create table medicine_dosage_form
(
	medicine_dosage_form_id smallint primary key,
	form_name varchar(214)
);

-- serial is the "old" implementation of auto-generated unique values that has been part of Postgres for ages. However that is not part of the SQL standard.
-- To be more compliant with the SQL standard, Postgres 10 introduced the syntax using generated as identity.
-- It is recommended to use the new identity syntax rather than serial.
-- https://stackoverflow.com/questions/55300370/postgresql-serial-vs-identity
-- DONE 2021-06-11
create table medicine
(
	medicine_id  int generated always as identity primary key,
	medicine_type boolean not null, -- 1/true: brand, 0:/false: generic
	what_is_this text,
	before_taking_this text,
	how_to_take_this text,
	what_happens_if_a_dose_missed text,
	what_happens_if_overdosed text,
	what_should_avoid_while_taking_this text,
	side_effects text, -- include common effects
	more_side_effects_in_details text,
	what_other_drugs_wil_affect text,
	other_drug_interactions_in_detail text,
	during_pregnancy text,
	during_breastfeeding text,
	medicine_dosage_forms smallint[], --array of medicine_dosage_form_ids foregin keys
	data_reference_urls varchar(255)[]	
);

-- DONE 2021-06-11
create table medicine_image
(
	medicine_image_id int generated always as identity primary key,
	medicine_image_local_path varchar(255) not null,
	medicine_id int references medicine(medicine_id) not null -- one medicine id will have more than one image
);
