set client_min_messages to warning;
create extension if not exists pgtap;
reset client_min_messages;

begin;

SELECT * FROM no_plan();

select has_view('connectivity_intake_public', 'form', 'There is a form view');

select has_column('connectivity_intake_public', 'form', 'id','Form view has column id');
select has_column('connectivity_intake_public', 'form', 'reference_number','Form view has column reference_number');
select has_column('connectivity_intake_public', 'form', 'created_by','Form view has column created_by');
select has_column('connectivity_intake_public', 'form', 'created_at','Form view has column created_at');
select has_column('connectivity_intake_public', 'form', 'updated_by','Form view has column updated_by');
select has_column('connectivity_intake_public', 'form', 'archived_by','Form view has column archived_by');
select has_column('connectivity_intake_public', 'form', 'archived_at','Form view has column archived_at');
select has_column('connectivity_intake_public', 'form', 'position','Form view has column position');
select has_column('connectivity_intake_public', 'form', 'extension','Form view has column extension');
select has_column('connectivity_intake_public', 'form', 'telephone','Form view has column telephone');
select has_column('connectivity_intake_public', 'form', 'contact_email','Form view has column contact_email');
select has_column('connectivity_intake_public', 'form', 'city','Form view has column city');
select has_column('connectivity_intake_public', 'form', 'po_box','Form view has column po_box');
select has_column('connectivity_intake_public', 'form', 'postal_code','Form view has column postal_code');
select has_column('connectivity_intake_public', 'form', 'street_name','Form view has column street_name');
select has_column('connectivity_intake_public', 'form', 'unit_number','Form view has column unit_number');
select has_column('connectivity_intake_public', 'form', 'primary_contact','Form view has column primary_contact');
select has_column('connectivity_intake_public', 'form', 'zone_information','Form view has column zone_information');
select has_column('connectivity_intake_public', 'form', 'zone_feedback','Form view has column zone_feedback');
select has_column('connectivity_intake_public', 'form', 'organization_name','Form view has column organization_name');
select has_column('connectivity_intake_public', 'form', 'organization_type','Form view has column organization_type');
select has_column('connectivity_intake_public', 'form', 'registration_number','Form view has column registration_number');
select has_column('connectivity_intake_public', 'form', 'fixed_wireless','Form view has column fixed_wireless');
select has_column('connectivity_intake_public', 'form', 'wired_broadband','Form view has column wired_broadband');
select has_column('connectivity_intake_public', 'form', 'pending_projects','Form view has column pending_projects');
select has_column('connectivity_intake_public', 'form', 'underserved_areas','Form view has column underserved_areas');
select has_column('connectivity_intake_public', 'form', 'satellite_proposal','Form view has column satellite_proposal');
select has_column('connectivity_intake_public', 'form', 'backbone_gaps','Form view has column backbone_gaps');
select has_column('connectivity_intake_public', 'form', 'new_backbone_technology','Form view has column new_backbone_technology');
select has_column('connectivity_intake_public', 'form', 'multiple_backbone_details','Form view has column multiple_backbone_details');
select has_column('connectivity_intake_public', 'form', 'govt_indigenous_conn_focus','Form view has column govt_indigenous_conn_focus');
select has_column('connectivity_intake_public', 'form', 'capital_cost_funding','Form view has column capital_cost_funding');
select has_column('connectivity_intake_public', 'form', 'capital_cost_explanation','Form view has column capital_cost_explanation');
select has_column('connectivity_intake_public', 'form', 'highway_cellular_geomark','Form view has column highway_cellular_geomark');
select has_column('connectivity_intake_public', 'form', 'last_mile_broadband_geomark','Form view has column last_mile_broadband_geomark');
select has_column('connectivity_intake_public', 'form', 'last_mile_new_backbone_geomark','Form view has column last_mile_new_backbone_geomark');

select finish();

rollback;
