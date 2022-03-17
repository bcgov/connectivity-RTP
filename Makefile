SHELL := /usr/bin/env bash
PSQL=psql -h localhost
PGTAP_VERSION=1.2.0

install_pgtap:
	@$(PSQL) -d postgres -tc "select count(*) from pg_available_extensions where name='pgtap' and default_version='$(PGTAP_VERSION)';" | \
		grep -q 1 || \
		(git clone https://github.com/theory/pgtap.git --depth 1 --branch v$(PGTAP_VERSION) && \
		$(MAKE) -C pgtap && \
		$(MAKE) -C pgtap install && \
		$(MAKE) -C pgtap installcheck && \
		rm -rf pgtap)
